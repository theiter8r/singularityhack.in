# Video Prompts — Google Flow (Veo 3), dreamy direction

Attachments to prepare once:

- `hero-16x9.png` — the generated portal-in-meadow image (the one you just made)
- `white.png` — a plain pure white image, 16:9

Flow notes:

- Clips are 8 seconds. Do not ask for 10.
- There is no negative-prompt box. Everything is in the one prompt.
- Veo generates sound by default. Each prompt says silent; audio gets stripped in code anyway.
- Clip 1: Frames to Video with `hero-16x9.png` as BOTH start and end frame. That is what makes the loop seamless.
- Clip 2: Text to Video, or crop `hero-16x9.png` to 9:16 around the portal and use it as start and end frame the same way.
- Clip 3: Frames to Video with only an end frame, `white.png`. That guarantees the white ending.
- Set the aspect ratio in Flow before generating: 16:9 for 1 and 3, 9:16 for 2.

---

## 1. Hero desktop

Mode: Frames to Video
Start frame: `hero-16x9.png` (the generated portal image)
End frame: `hero-16x9.png` (same image)
Aspect: 16:9

```
Silent, no dialogue, no music. Animate this image. The camera is locked off, no push-in, no drift. The figure is completely still. Inside the portal the silk wave of off-white and champagne-gold light flows slowly and continuously, folding over itself like slow smoke, never settling. Tiny embers and sparks drift out of the portal and rise lazily into the dark. A soft night breeze moves through the meadow: the tall grass and the white wildflowers sway gently in slow irregular waves, the ones nearest the portal catching warm rim light as they move. Thin haze near the ground drifts slowly to the right. The glow on the grass breathes very gently with the wave. Everything outside the glow stays near black and all four corners of the frame stay pure black. Painterly, dreamy, cinematic, 24fps. The motion is continuous and the shot ends exactly where it began so it loops seamlessly.
```

---

## 2. Hero mobile

Mode: Text to Video
Aspect: 9:16

```
Silent, no dialogue, no music. Vertical shot. A lone figure in a long dark coat stands in a dark meadow at night, back to camera, small in the frame, facing a towering rectangular portal that rises out of the tall grass and fills the middle of the frame. Inside the portal a vast slow-moving wave of soft off-white and champagne-gold light rolls like silk, the only light in the scene, spilling a faint warm glow onto the tips of the grass and wildflowers around the figure. Everything beyond that glow is near black; the sky is black, the ground at the bottom edge is black, and the top and bottom of the frame stay pure black. The wave drifts slowly and the light breathes once, gently brightening then dimming. Painterly, dreamy, cinematic, thin haze, tiny drifting pollen catching the light, the figure completely still. Extremely slow push-in. 24fps. The shot ends where it began.
```

---

## 3. Story section

Mode: Frames to Video
Start frame: none
End frame: `white.png`
Aspect: 16:9

```
Silent, no dialogue, no music. One continuous cinematic shot. Low camera directly behind a lone figure in a long dark coat, walking slowly forward through a dark meadow at night, tall grass and wildflowers brushing past, steady dolly following at walking pace. Far ahead is a small rectangular portal of soft off-white and champagne-gold light, a slow silk wave moving inside it, the only light in the scene, tiny at first. The figure's silhouette and the faint glow on the nearest grass are the only visible details, and the center of the frame stays dark for most of the shot. As the figure walks, the portal steadily grows larger and brighter and the wave inside it fills more of the frame. In the last two seconds the figure reaches the portal and steps into the light, and the whole frame blooms into pure soft white and holds. Painterly, dreamy, thin haze, drifting pollen, the figure always facing away from camera. 24fps.
```
