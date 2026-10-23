
from fusion_engine import evaluate_all_sectors


def run_scenario(
    name,
    moisture,
    slope_saturation=None,
    pooling_index=None,
    temperature=28.5,
):
    result = evaluate_all_sectors(
        ground_moisture=moisture,
        et_loss_72h=0,
        ambient_temp_c=temperature,
        slope_saturation_pct=slope_saturation,
        pooling_index=pooling_index,
    )

    print("\n" + "=" * 55)
    print("AGRIMESH:", name)
    print("=" * 55)

    print("\n1. AGRICULTURE")
    print(result["sector1_agriculture_and_seed"])

    print("\n2. BANK & CROP INSURANCE")
    print(result["sector2_bank_and_crop_insurance"])

    print("\n3. HIGHWAY & DISASTER")
    print(result["sector3_nhai_highway_and_disaster"])

    print("\n4. PUBLIC HEALTH")
    print(result["sector4_public_health_and_pharma"])

    grid = result["village_dem_heatmap_10x10"]
    print("\nMOISTURE HEATMAP")
    print(f"Grid dimensions: {len(grid)} x {len(grid[0])}")
    print("First row:", grid[0])


if __name__ == "__main__":
    run_scenario(
        name="DROUGHT SCENARIO",
        moisture=15,
        slope_saturation=40,
        pooling_index=20,
    )

    run_scenario(
        name="NORMAL VILLAGE SCENARIO",
        moisture=58,
        slope_saturation=60,
        pooling_index=40,
    )

    run_scenario(
        name="HEAVY RAIN / DISASTER SCENARIO",
        moisture=90,
        slope_saturation=90,
        pooling_index=80,
        temperature=28.5,
    )
