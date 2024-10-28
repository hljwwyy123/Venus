#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_resolution;

float circleshap(vec2 position, float radius) {
  return step(radius, length(position - vec2(0.5)));
}

float circleshap2(vec2 position) {
  return smoothstep(0.5, 0.2, length(position - vec2(0.5)));
}

void main() {
  vec2 position = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(1.0);
  float circle = circleshap(position, .2);
  // float cirlce = circleshap2(position);
  color = vec3(circle);
  gl_FragColor = vec4(color, 1.0);
}



