
def build_alert_summary(result):
    alerts = []

    agriculture = result["sector1_agriculture_and_seed"]
    insurance = result["sector2_bank_and_crop_insurance"]
    highway = result["sector3_nhai_highway_and_disaster"]
    health = result["sector4_public_health_and_pharma"]

    if agriculture["sowing_window_status"] == "SEVERE_DROUGHT":
        alerts.append("DROUGHT: Severe soil-moisture risk")

    if insurance["parametric_drought_triggered"]:
        alerts.append("INSURANCE: Simulated drought trigger")

    if highway["alert_triggered"]:
        alerts.append("HIGHWAY: Critical slope saturation")

    if health["alert_triggered"]:
        alerts.append("PUBLIC HEALTH: High breeding-risk flag")

    if not alerts:
        alerts.append("NORMAL: No critical prototype triggers")

    return alerts


if __name__ == "__main__":
    from fusion_engine import evaluate_all_sectors

    scenarios = [
        ("DROUGHT", evaluate_all_sectors(
            15, et_loss_72h=0,
            slope_saturation_pct=40, pooling_index=20
        )),
        ("NORMAL", evaluate_all_sectors(
            58, et_loss_72h=0,
            slope_saturation_pct=60, pooling_index=40
        )),
        ("DISASTER", evaluate_all_sectors(
            90, et_loss_72h=0,
            slope_saturation_pct=90, pooling_index=80
        )),
    ]

    for name, result in scenarios:
        print("\n" + "=" * 45)
        print("AGRIMESH ALERT:", name)
        print("=" * 45)

        for alert in build_alert_summary(result):
            print(">>", alert)
