<div v-custom-directive v-once id="uniqueID" v-if="!visible" v-text="textContent" v-model="headerData" my-prop="prop" ref="header" is="header" v-for="item in items" @click="functionCall">
foo
</div>
<div @click="functionCall" v-text="textContent" v-for="item in items" prop-three="prop" v-if="!visible" prop-one="prop" :prop-two="prop">
bar
</div>
<div :prop-two="prop" prop-three="prop" prop-one="prop">
baz
</div>
---
<div is="header" v-for="item in items" v-if="!visible" v-once id="uniqueID" ref="header" v-model="headerData" v-custom-directive my-prop="prop" @click="functionCall" v-text="textContent">
foo
</div>
<div v-for="item in items" v-if="!visible" prop-three="prop" prop-one="prop" :prop-two="prop" @click="functionCall" v-text="textContent">
bar
</div>
<div :prop-two="prop" prop-three="prop" prop-one="prop">
baz
</div>
