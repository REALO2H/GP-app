import h5py
import shutil
import os

# === INPUT/OUTPUT FILES ===
original_path = r"D:\\gp_app\\model-api\\model\\resnet_trail_6.h5"
stripped_path = r"D:\\gp_app\\model-api\\model\\resnet_6_stripped.h5"

# Make a backup copy first (optional but recommended)
shutil.copyfile(original_path, stripped_path)

# Open the copied file in read/write mode
with h5py.File(stripped_path, 'r+') as f:
    # Remove training config attribute
    if 'training_config' in f.attrs:
        del f.attrs['training_config']
        print("✔ Removed 'training_config'")

    # Remove optimizer weights group
    if 'optimizer_weights' in f:
        del f['optimizer_weights']
        print("✔ Removed 'optimizer_weights'")

    # Sometimes there’s an 'optimizer_names' attr too
    if 'optimizer_names' in f.attrs:
        del f.attrs['optimizer_names']
        print("✔ Removed 'optimizer_names'")

print(f"✅ Stripped model saved as: {stripped_path}")


