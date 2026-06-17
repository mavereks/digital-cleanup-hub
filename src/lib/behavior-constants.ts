/**
 * BEHAVIOR / TRANSMISSION constants (email, video calls).
 *
 * IMPORTANT: these are SEND/USE footprints, not storage, and they are far less settled than the
 * storage numbers in constants.ts. Treat everything here as ORDER-OF-MAGNITUDE and always show a
 * range, never a point estimate. Kept in a separate file on purpose. Sources in
 * docs/co2-methodology.md (Behavior addendum).
 */

/**
 * EMAIL — footprint of SENDING one message (device + network + some data center). grams CO2e.
 * Berners-Lee, "How Bad Are Bananas?" (2010): spam 0.3 g, standard 4 g, large attachment ~50 g.
 * The 2020 2nd edition revised the per-email range DOWN to ~0.03-26 g (more efficient devices /
 * data centers). The author himself warns against using these figures too precisely. We use the
 * 0.3-4 g band (unread/short -> standard) as a conservative, defensible lever range.
 */
export const EMAIL_G_PER_MESSAGE = { low: 0.3, high: 4 } as const;

/**
 * VIDEO CALL — footprint per hour of a camera-on call. grams CO2e/hour.
 * Obringer et al. 2021 (Resources, Conservation & Recycling): 150-1000 g/hr (authors call the
 * estimates "rough"). Newer work (Carbon Trust 2021) puts streaming far lower (~tens of g/hr in
 * Europe), and network energy is largely fixed rather than proportional to bitrate, so the true
 * value is highly uncertain. The low bound reflects the newer, lower estimates.
 */
export const VIDEO_CALL_G_PER_HOUR = { low: 55, high: 1000 } as const;

/**
 * Fraction of a video call's footprint avoided by turning the camera OFF.
 * Obringer et al. 2021: ~96%.
 */
export const CAMERA_OFF_FRACTION = 0.96;

/** Weeks per year, for annualizing per-week behavior inputs. */
export const WEEKS_PER_YEAR = 52;
