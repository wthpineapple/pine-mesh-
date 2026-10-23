
from fusion_engine import evaluate_all_sectors


def test_drought():
    result = evaluate_all_sectors(15, et_loss_72h=0)
    assert result["alert_trigger_state"] == "SEVERE_DROUGHT"
    print("PASS: Drought scenario")


def test_optimal_sowing():
    result = evaluate_all_sectors(58, et_loss_72h=0)
    assert result["alert_trigger_state"] == "OPTIMAL_48HR_SOWING_WINDOW"
    print("PASS: Optimal sowing scenario")


def test_high_moisture():
    result = evaluate_all_sectors(90, et_loss_72h=0)
    assert result["alert_trigger_state"] == "MONITOR_MOISTURE"
    print("PASS: High moisture scenario")


def test_heatmap():
    result = evaluate_all_sectors(58, et_loss_72h=0)
    grid = result["village_dem_heatmap_10x10"]

    assert len(grid) == 10
    assert all(len(row) == 10 for row in grid)
    print("PASS: Heatmap dimensions")


if __name__ == "__main__":
    test_drought()
    test_optimal_sowing()
    test_high_moisture()
    test_heatmap()
    print("\nAll tests passed!")
