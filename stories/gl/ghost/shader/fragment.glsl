varying vec2 vUv;
uniform float u_ratio;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_target_mouse;
uniform float u_face_expression;
uniform sampler2D u_touch_texture;

// --------------------------------
// Ghost face

float eyes(vec2 _st) {
  _st.x = abs(_st.x);
  
  _st.y += pow(_st.x, 2.0 - 0.4 * u_face_expression);
  _st.x -= (0.08 + 0.03 * u_face_expression);
  _st.y *= 0.8;
  
  _st *= 10.0;
  
  float d = length(_st);
  d = pow(d, 0.4);
  
  return clamp(1.0 - d, 0.0, 1.0);
}

float mouth(vec2 _st) {
  _st *= 13.0;
  _st.y *= 0.8;
  
  _st.x /= (1.0 + 2.0 * u_face_expression);
  _st.y *= (1.0 + 0.7 * u_face_expression);
  _st.y -= pow(_st.x, 2.0) * 2.0 * u_face_expression;
  
  float d = length(_st);
  d = pow(d, 0.7);
  
  return clamp(1.0 - d, 0.0, 1.0);
}

float face(vec2 _st) {
  _st *= 3.5;
  
  float eyes_shape = eyes(_st - vec2(0.0, 0.1));
  float mouth_shape = mouth(_st - vec2(0.0, - 0.2));
  
  float col;
  col = mix(col, 1.0, eyes_shape);
  col = mix(col, 1.0, mouth_shape);
  
  return col;
}

// --------------------------------
// 2D noise

vec3 mod289(vec3 x) {return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) {return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) {return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, - 0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v-i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x-ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = vUv;
  
  vec2 mouse = st - u_mouse.xy;
  mouse.x *= u_ratio;
  vec2 mouse_target = st - u_target_mouse.xy;
  mouse_target.x *= u_ratio;
  
  // Texture we create and update in JS => bas shape
  float touch = texture2D(u_touch_texture, st).r;
  
  // Add noise to the base shape
  vec2 noise_pos = vec2(st * 6.0);
  float noise = snoise(noise_pos + vec2(0.0, u_time)) * 0.25 + 0.25;
  noise += snoise(noise_pos) * 0.25 + 0.3;
  touch *= noise;
  
  // Add face
  touch -= 1.2 * face(mouse - 0.1 * (mouse - mouse_target));
  
  // Apply color scheme
  vec3 color = mix(vec3(1, 1, 1), vec3(1, 0.2, 0.18), smoothstep(0.003, 0.3, touch));
  gl_FragColor = vec4(color, 1.0);
}