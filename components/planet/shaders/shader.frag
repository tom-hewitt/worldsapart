varying vec2 vUv;

void main() {
    vec3 colorA = vec3(0.87, 0.25, 0.25); // Red
    vec3 colorB = vec3(0.31, 0.6, 0.94);  // Blue
    vec3 colorC = vec3(0.85, 0.46, 0.22); // Orange
    vec3 colorD = vec3(0.88, 0.49, 0.8);  // Yellow

    // Calculate the distance from the center of the screen
    vec2 center = vec2(0.5, 0.5);
    float distance = distance(vUv, center);

    // Map the distance to a range between 0 and 1
    float gradientFactorAB = smoothstep(0.0, 0.4, distance); // Red to Blue
    float gradientFactorCD = smoothstep(0.4, 0.8, distance); // Orange to Yellow

    // Mix the colors based on the gradient factors
    vec3 colorAB = mix(colorA, colorB, gradientFactorAB);
    vec3 colorCD = mix(colorC, colorD, gradientFactorCD);
    
    // Blend the two gradient colors together
    vec3 finalColor = mix(colorAB, colorCD, gradientFactorCD);

    gl_FragColor = vec4(finalColor, 1.0);
}