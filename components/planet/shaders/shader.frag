varying vec2 vUv;

uniform vec3 colorA;
uniform vec3 colorB;
uniform vec3 colorC;
uniform vec3 colorD;
uniform int shaderType;

void main() {
    if(shaderType == 0) {
        float numBands = 20.0;
        float bandWidth = 1.0 / numBands;

        float bandIndex = floor(vUv.y * numBands);

        float band = smoothstep(bandIndex * bandWidth, (bandIndex + 1.0) * bandWidth, vUv.y);
        float nextBand = smoothstep((bandIndex + 1.0) * bandWidth, (bandIndex + 2.0) * bandWidth, vUv.y);

        vec3 colorAB = mix(colorA, colorB, band);
        vec3 colorBC = mix(colorB, colorC, band);
        vec3 colorCD = mix(colorC, colorD, band);
        vec3 finalColor = mix(colorCD, colorD, nextBand);
        gl_FragColor = vec4(finalColor, 1.0);

    } else {
        float bandWidth = 0.25;
        float band1 = smoothstep(0.0, bandWidth, vUv.y);
        float band2 = smoothstep(bandWidth, 2.0 * bandWidth, vUv.y);
        float band3 = smoothstep(2.0 * bandWidth, 3.0 * bandWidth, vUv.y);
        float band4 = smoothstep(3.0 * bandWidth, 1.0, vUv.y);

// Adjust the interpolation ranges to ensure all colors are visible
        vec3 colorAB = mix(colorA, colorB, band1);
        vec3 colorBC = mix(colorB, colorC, band2 - band1);
        vec3 colorCD = mix(colorC, colorD, band3 - band2);
        vec3 finalColor = mix(colorD, colorC, band4 - band3);

        gl_FragColor = vec4(finalColor, 1.0);
    }     
}