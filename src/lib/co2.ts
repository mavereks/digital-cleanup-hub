/**
 * CO2-per-storage calculator — pure calculation logic.
 *
 * Formula (docs/co2-methodology.md):
 *     kg CO2e/yr = TB x R x (E_op x CI + Emb)
 *
 * Boundary: operational energy + cooling (PUE) + amortized manufacturing, per year of retention.
 * EXCLUDES data transfer and access (a separate, access-driven term).
 */

import {
  OPERATIONAL_ENERGY_KWH_PER_TB_YR as E,
  CARBON_INTENSITY_KG_PER_KWH as CI,
  EMBODIED_KG_PER_TB_YR as EMB,
  REPLICATION as REP,
  SSD_MULTIPLIER as SSD,
} from "./constants";

export type StorageMedium = "hdd" | "ssd";

export interface Co2Input {
  /** Storage amount in terabytes. Use replication (R) to convert logical TB -> physical TB. */
  storageTB: number;
  /** Storage medium. Default "hdd" (the defensible default for bulk/general cloud). */
  medium?: StorageMedium;
  /** Replication / durability multiplier R. Default 1 (physical TB). */
  replication?: number;
  /** Grid carbon intensity in kg CO2e/kWh. Default = US average. */
  carbonIntensity?: number;
  /** Override operational energy (kWh/TB/yr). Defaults to the documented central value. */
  opEnergyKwhPerTbYr?: number;
  /** Override amortized embodied carbon (kg CO2e/TB/yr). Defaults to the documented central. */
  embodiedKgPerTbYr?: number;
}

export interface Co2Estimate {
  /** Central estimate in kg CO2e/year. `null` for SSD (no defensible point estimate). */
  central: number | null;
  /** Lower bound, kg CO2e/year. */
  low: number;
  /** Upper bound, kg CO2e/year. */
  high: number;
  unit: "kg CO2e/year";
  medium: StorageMedium;
  /** Resolved inputs, for transparent display in the UI. */
  assumptions: {
    storageTB: number;
    replication: number;
    carbonIntensity: number;
  };
  /** Short methodology note to surface near the result. */
  note: string;
}

/** Annual operational + embodied CO2 for one TB-year at a given grid intensity: (E_op*CI + Emb). */
export function perTbYear(opEnergy: number, carbonIntensity: number, embodied: number): number {
  return opEnergy * carbonIntensity + embodied;
}

/**
 * Estimate annual storage CO2e.
 *
 * The returned low/high reflect the operational-energy and embodied ranges AT THE CHOSEN grid
 * intensity and replication. The grid is a lever the caller already set, so it is not varied
 * again inside the band (that would double-count it). The documented 3-8 kg/TB/yr band in
 * docs/co2-methodology.md is the cross-everything figure; per-configuration ranges are narrower.
 */
export function estimateAnnualCO2(input: Co2Input): Co2Estimate {
  const { storageTB } = input;
  if (!Number.isFinite(storageTB) || storageTB < 0) {
    throw new RangeError(`storageTB must be a finite number >= 0 (got ${storageTB})`);
  }

  const replication = input.replication ?? REP.default;
  const carbonIntensity = input.carbonIntensity ?? CI.default;
  const medium: StorageMedium = input.medium ?? "hdd";
  const opDefault = input.opEnergyKwhPerTbYr ?? E.default;
  const embDefault = input.embodiedKgPerTbYr ?? EMB.default;

  const base = storageTB * replication;

  const hddCentral = base * perTbYear(opDefault, carbonIntensity, embDefault);
  const hddLow = base * perTbYear(E.min, carbonIntensity, EMB.min);
  const hddHigh = base * perTbYear(E.max, carbonIntensity, EMB.max);

  const assumptions = { storageTB, replication, carbonIntensity };

  if (medium === "ssd") {
    return {
      central: null, // no defensible single SSD value — UI must show the range only
      low: hddLow * SSD.min,
      high: hddHigh * SSD.max,
      unit: "kg CO2e/year",
      medium,
      assumptions,
      note:
        "SSD/hot-tier: embodied carbon dominates and published LCAs disagree ~50x, so only a " +
        "range is defensible (~2-6x the HDD figure). Do not present a single SSD number.",
    };
  }

  return {
    central: hddCentral,
    low: hddLow,
    high: hddHigh,
    unit: "kg CO2e/year",
    medium,
    assumptions,
    note: "HDD / general cloud. Operational + amortized embodied; excludes transfer & access.",
  };
}
