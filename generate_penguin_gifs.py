#!/usr/bin/env python3
from PIL import Image, ImageDraw
import os

# Load the penguin image
penguin_path = '/Users/dawit/Desktop/pet/vscode-pets/docs/source/_static/penguin-removebg-preview.png'
penguin_img = Image.open(penguin_path).convert('RGBA')

# Resize to a smaller size for animation frames
penguin_small = penguin_img.resize((100, 100), Image.Resampling.LANCZOS)

# Output directory
output_dir = '/Users/dawit/Desktop/pet/vscode-pets/media/penguin'
os.makedirs(output_dir, exist_ok=True)

# Define colors and their transformations
colors = {
    'black': (20, 20, 20, 255),
    'white': (240, 240, 240, 255),
    'blue': (50, 100, 200, 255),
    'yellow': (255, 220, 0, 255),
    'magical': (150, 100, 200, 255),
}

def apply_color_overlay(img, color):
    """Apply a color overlay to the image"""
    overlay = Image.new('RGBA', img.size, color)
    overlay.putalpha(128)
    result = Image.new('RGBA', img.size)
    result = Image.alpha_composite(result, img)
    result = Image.alpha_composite(result, overlay)
    return result

def create_animation_frames(img, num_frames=8):
    """Create animation frames with slight movement/scale variations"""
    frames = []
    for i in range(num_frames):
        # Create a frame with slight scale variation (bobbing effect)
        scale = 1.0 + 0.1 * (i - num_frames/2) / (num_frames/2)
        w, h = img.size
        new_size = (int(w * scale), int(h * scale))
        frame = img.resize(new_size, Image.Resampling.LANCZOS)
        
        # Center on canvas
        canvas = Image.new('RGBA', img.size, (0, 0, 0, 0))
        offset = ((w - new_size[0]) // 2, (h - new_size[1]) // 2)
        canvas.paste(frame, offset, frame)
        frames.append(canvas)
    return frames

# States to generate
states = [
    'idle', 'walk', 'walk_fast', 'run', 'stand',
    'sit_idle', 'swipe', 'with_ball', 'land'
]

# Generate GIFs for each color and state
for color_name, color_value in colors.items():
    colored_penguin = apply_color_overlay(penguin_small, color_value)
    
    for state in states:
        frames = create_animation_frames(colored_penguin, 8)
        
        # Determine fps based on state
        if state == 'run':
            duration = 60
        elif state == 'walk_fast':
            duration = 80
        elif state == 'walk':
            duration = 120
        else:
            duration = 150
        
        # Create filename
        filename = f'{color_name}_{state}_8fps.gif'
        filepath = os.path.join(output_dir, filename)
        
        # Save as GIF
        frames[0].save(
            filepath,
            save_all=True,
            append_images=frames[1:],
            duration=duration,
            loop=0,
            optimize=False
        )
        print(f'Created: {filename}')

# Generate icon
icon_path = os.path.join(output_dir, 'icon.png')
penguin_small.save(icon_path)
print(f'Created: icon.png')

for color_name in colors.keys():
    icon_path = os.path.join(output_dir, f'icon_{color_name}.png')
    colored = apply_color_overlay(penguin_small, colors[color_name])
    colored.save(icon_path)
    print(f'Created: icon_{color_name}.png')

print('\nPenguin GIFs generated successfully!')
