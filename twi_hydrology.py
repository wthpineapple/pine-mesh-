
import math


def calculate_twi(
    upslope_area: float,
    slope_degrees: float,
) -> float:
    """
    Calculate the Topographic Wetness Index (TWI).

    upslope_area: contributing area per unit contour width
    slope_degrees: terrain slope angle in degrees

    Formula: TWI = ln(upslope_area / tan(slope_angle))
    """

    if not math.isfinite(upslope_area) or upslope_area <= 0:
        raise ValueError("Upslope area must be a positive finite number.")

    if not math.isfinite(slope_degrees):
        raise ValueError("Slope must be a finite number.")

    if not 0 < slope_degrees < 90:
        raise ValueError("Slope must be between 0 and 90 degrees.")

    slope_radians = math.radians(slope_degrees)
    tan_slope = math.tan(slope_radians)

    twi = math.log(upslope_area / tan_slope)

    return round(twi, 4)


if __name__ == "__main__":
    area = 100.0
    slope = 10.0

    result = calculate_twi(area, slope)

    print("AGRIMESH — TWI HYDROLOGY TEST")
    print("Upslope contributing area:", area)
    print("Slope angle:", slope, "degrees")
    print("Calculated TWI:", result)
