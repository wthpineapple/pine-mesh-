
from fusion_engine import generate_village_heatmap


def show_heatmap(base_moisture=58):
    grid = generate_village_heatmap(base_moisture)

    # ANSI colors for the VS Code terminal
    BLUE = "\033[94m"
    YELLOW = "\033[93m"
    RED = "\033[91m"
    RESET = "\033[0m"

    print("\nAGRIMESH — VILLAGE MOISTURE HEATMAP")
    print(f"Base moisture: {base_moisture}%")
    print("Each square represents one simulated grid cell.\n")

    for row in grid:
        for moisture in row:
            if moisture < 30:
                color = RED
            elif moisture <= 60:
                color = YELLOW
            else:
                color = BLUE

            print(f"{color}██{RESET}", end=" ")
        print()

    print("\nLEGEND")
    print(f"{RED}██{RESET} Dry: below 30%")
    print(f"{YELLOW}██{RESET} Moderate: 30–60%")
    print(f"{BLUE}██{RESET} Wet: above 60%")

    print("\nSample moisture readings:")
    for row in grid:
        print(" ".join(f"{value:5.1f}" for value in row))


if __name__ == "__main__":
    show_heatmap(58)
