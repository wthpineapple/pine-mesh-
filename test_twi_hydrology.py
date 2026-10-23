
from twi_hydrology import calculate_twi


def test_gentle_slope():
    result = calculate_twi(100.0, 10.0)
    print("Actual TWI result:", result)
    assert abs(result - 6.3406) < 0.001
    print("PASS: Gentle slope")

def test_steeper_slope():
    gentle = calculate_twi(100.0, 10.0)
    steep = calculate_twi(100.0, 30.0)
    assert steep < gentle
    print("PASS: Steeper slope gives lower TWI")


def test_larger_contributing_area():
    small = calculate_twi(50.0, 10.0)
    large = calculate_twi(100.0, 10.0)
    assert large > small
    print("PASS: Larger contributing area gives higher TWI")


def test_invalid_inputs():
    for area, slope in [
        (0, 10),
        (-5, 10),
        (100, 0),
        (100, 90),
    ]:
        try:
            calculate_twi(area, slope)
        except ValueError:
            continue
        raise AssertionError(
            f"Expected ValueError for area={area}, slope={slope}"
        )

    print("PASS: Invalid inputs rejected")


if __name__ == "__main__":
    test_gentle_slope()
    test_steeper_slope()
    test_larger_contributing_area()
    test_invalid_inputs()
    print("\nAll TWI tests passed!")
