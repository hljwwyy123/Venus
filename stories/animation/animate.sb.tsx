import AnimateBorder from "./animateBorder/animteBorder";
import Glitch from "./glitch";
import TweenParticle from "./particle/Tweenmax"
import DrawImageData from "./particle/DrawImageData";

export default {
  title: '动画',
  component: [Glitch, AnimateBorder, TweenParticle, DrawImageData]
}

export { Glitch, AnimateBorder, TweenParticle, DrawImageData }