
# import math
# import numpy as np


# def evaluate_all_sectors(
#     ground_moisture: float,
#     et_loss_72h: float = 8.0,
#     ambient_temp_c: float = 28.5,
# ) -> dict:
#     """Initial AgriMesh prototype decision engine."""

#     # Validate inputs
#     values = [ground_moisture, et_loss_72h, ambient_temp_c]

#     if not all(math.isfinite(float(v)) for v in values):
#         raise ValueError("All inputs must be finite numbers.")

#     if not 0 <= ground_moisture <= 100:
#         raise ValueError("Ground moisture must be between 0 and 100.")

#     if et_loss_72h < 0:
#         raise ValueError("ET loss cannot be negative.")

#     # Initial agriculture rules from the handbook
#     projected_moisture = max(0.0, ground_moisture - et_loss_72h)

#     if projected_moisture < 20:
#         sowing_status = "SEVERE_DROUGHT"
#     elif 42 <= projected_moisture <= 70:
#         sowing_status = "OPTIMAL_48HR_SOWING_WINDOW"
#     else:
#         sowing_status = "MONITOR_MOISTURE"

#     # Synthetic 10x10 grid for dashboard development.
#     # This is NOT real DEM or satellite-derived data.
#     grid = np.full((10, 10), ground_moisture, dtype=float)

#     village_dem_heatmap_10x10 = grid.tolist()

#     return {
#         "alert_trigger_state": sowing_status,
#         "voice_and_sms_payload": {
#             "English": sowing_status,
#             "Hindi": sowing_status,
#             "Tamil": sowing_status,
#         },
#         "telemetry_metadata": {
#             "ground_moisture_pct": ground_moisture,
#             "et_loss_72h": et_loss_72h,
#             "ambient_temp_c": ambient_temp_c,
#             "projected_moisture_pct": projected_moisture,
#             "data_type": "synthetic_prototype",
#         },
#         "village_dem_heatmap_10x10": village_dem_heatmap_10x10,
#         "sector1_agriculture_and_seed": {
#             "sowing_window_status": sowing_status,
#             "sowing_confidence_index_pct": None,
#         },
#         "sector2_bank_and_crop_insurance": {
#             "parametric_drought_triggered": projected_moisture < 20,
#             "status": "SIMULATED_ONLY",
#         },
#         "sector3_nhai_highway_and_disaster": {
#             "highway_slope_saturation_pct": None,
#             "nhai_landslide_risk_status": "INSUFFICIENT_DATA",
#         },
#         "sector4_public_health_and_pharma": {
#             "depression_pooling_index": None,
#             "public_health_status": "INSUFFICIENT_DATA",
#         },
#     }


# if __name__ == "__main__":
#     for moisture in (15.0, 58.0, 90.0):
#         result = evaluate_all_sectors(
#             ground_moisture=moisture,
#             et_loss_72h=0.0,
#         )
#         print(f"\nInput moisture: {moisture}%")
#         print("Decision:", result["alert_trigger_state"])
#         print(
#             "Heatmap dimensions:",
#             len(result["village_dem_heatmap_10x10"]),
#             "x",
#             len(result["village_dem_heatmap_10x10"][0]),
#         )

import math
import numpy as np


def evaluate_all_sectors(
    ground_moisture: float,
    et_loss_72h: float = 8.0,
    ambient_temp_c: float = 28.5,
) -> dict:

    if not all(math.isfinite(float(v)) for v in (
        ground_moisture, et_loss_72h, ambient_temp_c
    )):
        raise ValueError("Inputs must be finite numbers.")

    if not 0 <= ground_moisture <= 100:
        raise ValueError("Moisture must be between 0 and 100.")

    if et_loss_72h < 0:
        raise ValueError("ET loss cannot be negative.")

    projected_moisture = max(0.0, ground_moisture - et_loss_72h)

    if projected_moisture < 20:
        status = "SEVERE_DROUGHT"
    elif 42 <= projected_moisture <= 70:
        status = "OPTIMAL_48HR_SOWING_WINDOW"
    else:
        status = "MONITOR_MOISTURE"

    # Synthetic grid for the prototype dashboard
    heatmap = np.full((10, 10), ground_moisture).tolist()

    return {
        "alert_trigger_state": status,
        "voice_and_sms_payload": {
            "English": status
        },
        "telemetry_metadata": {
            "ground_moisture_pct": ground_moisture,
            "projected_moisture_pct": projected_moisture,
            "et_loss_72h": et_loss_72h,
            "ambient_temp_c": ambient_temp_c
        },
        "village_dem_heatmap_10x10": heatmap,
        "sector1_agriculture_and_seed": {
            "sowing_window_status": status
        },
        "sector2_bank_and_crop_insurance": {
            "parametric_drought_triggered": projected_moisture < 20,
            "status": "SIMULATED_ONLY"
        },
        "sector3_nhai_highway_and_disaster": {
            "nhai_landslide_risk_status": "INSUFFICIENT_DATA"
        },
        "sector4_public_health_and_pharma": {
            "public_health_status": "INSUFFICIENT_DATA"
        }
    }


if __name__ == "__main__":
    for moisture in [15, 58, 90]:
        result = evaluate_all_sectors(moisture, et_loss_72h=0)
        print(f"\nMoisture: {moisture}%")
        print("Decision:", result["alert_trigger_state"])
        print("Heatmap:", len(result["village_dem_heatmap_10x10"]),
              "x", len(result["village_dem_heatmap_10x10"][0]))
