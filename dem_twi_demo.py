
import numpy as np
from twi_hydrology import calculate_twi


def create_synthetic_dem():
    """Create a simulated 10x10 elevation grid in metres."""
    rows, cols = np.indices((10, 10))

    elevation = (
        100
        + rows * 1.5
        + cols * 0.8
        + 3 * np.sin(rows * 0.7)
        + 2 * np.cos(cols * 0.5)
    )

    return elevation


def calculate_slope_grid(elevation):
    """Estimate terrain slope in degrees."""
    row_gradient, col_gradient = np.gradient(elevation)

    gradient_magnitude = np.sqrt(
        row_gradient**2 + col_gradient**2
    )

    slope_degrees = np.degrees(
        np.arctan(gradient_magnitude)
    )

    return np.clip(slope_degrees, 0.1, 89.9)


def main():
    elevation = create_synthetic_dem()
    slope_grid = calculate_slope_grid(elevation)

    # DEM flow accumulation is not implemented yet.
    # These placeholder values are for demonstration only.
    upslope_area = 100.0

    twi_grid = np.zeros((10, 10))

    for row in range(10):
        for col in range(10):
            twi_grid[row, col] = calculate_twi(
                upslope_area,
                float(slope_grid[row, col])
            )

    print("AGRIMESH — DEM AND TWI PROTOTYPE")
    print("=" * 42)

    print("\nElevation grid (metres):")
    print(np.round(elevation, 1))

    print("\nSlope grid (degrees):")
    print(np.round(slope_grid, 1))

    print("\nIllustrative TWI grid:")
    print(np.round(twi_grid, 2))

    print("\nGrid dimensions:", twi_grid.shape)
    print("Minimum TWI:", round(float(twi_grid.min()), 2))
    print("Maximum TWI:", round(float(twi_grid.max()), 2))

    print("\nNote: Synthetic terrain and placeholder upslope area.")
    print("This is a demonstration, not a real-world risk map.")


if __name__ == "__main__":
    main()
