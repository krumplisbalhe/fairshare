<template>
  <div class="toggleWrapper">
    <div class="toggle">
      <input id="toggleInput" type="checkbox" :value="value" @input="$emit('input', !value)">
      <label for="toggleInput"></label>
    </div>
    <div class="toggleText">
      {{ toggleText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  props: ['value', 'toggleText'],
  components: {
  },
  data () {
		return {
		}
  },
}
</script>

<style>
.toggleWrapper{
  display: flex;
  align-items: center;
  padding-bottom: 30px;
}

.toggle{
  width: 60px;
}

.toggle input{
  display: none;
}

label {
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  box-shadow: .3rem .3rem .6rem var(--shadowColor), -.2rem -.2rem .5rem var(--white);;
  background: var(--backgroundColor);
  position: relative;
  cursor: pointer;
  border-radius: 25px;
}

label::after {
  content: "";
  position: absolute;
  left: .4rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--actionTextColor);
  transition: all 0.4s ease;
}

label::before {
      content: '';
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(330deg, var(--colorPurple) 0%, var(--colorOrange) 100%);
      opacity: 0;
      transition: all 0.4s ease;
}

.toggle input:checked + label::before {
  opacity: 1;
}

.toggle input:checked + label::after {
  left: 57%;
}

.toggleText{
  padding-left: 15px;
  text-shadow: 1px 1px 0 var(--white);
  font-size: 15px;
  color: var(--actionTextColor);
}
</style>
