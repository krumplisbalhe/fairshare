<template>
  <div class="toggleWrapper">
    <div class="toggle">
      <input
        id="toggleInput"
        type="checkbox"
        :value="value"
        @input="$emit('input', !value)"
      />
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
  props: ['value', 'toggleText']
}
</script>

<style lang="scss" scoped>
.toggleWrapper {
  display: flex;
  align-items: center;
  padding-bottom: 30px;
}

.toggle {
  width: 48px;

  input {
    display: none;
  }
}

label {
  display: flex;
  align-items: center;
  width: 100%;
  height: 25px;
  box-shadow: var(--boxShadow);
  background: var(--backgroundColor);
  position: relative;
  cursor: pointer;
  border-radius: 25px;
  border: var(--solidBorder);

  &::after {
    content: "";
    position: absolute;
    left: 4px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--classicBlue);
    transition: all 0.4s ease;
  }

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(280deg, var(--white) 0%, var(--paprika) 100%);
    opacity: 0;
    transition: all 0.4s ease;
  }
}

.toggle input:checked + label::before {
  opacity: 1;
}

.toggle input:checked + label::after {
  left: 57%;
}

.toggleText {
  padding-left: 15px;
  font-size: 12px;
  color: var(--inputTextColor);
}
</style>
