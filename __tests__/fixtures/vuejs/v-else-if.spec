<q-card-section>
    <span v-if="value.name === 'Name'">
        <span v-if="!member.insurances.length">Name.</span>
        <span v-else> Test </span>
    </span>
    <span id="name1" v-else-if="value.name === 'Name1'">
        <span v-if="!member.checks.length">Name1.</span>
        <span v-else> Test </span>
    </span>
    <span id="name2" v-else-if="value.name === 'Name2'">
        <span v-if="!member.rights.length">Name2.</span>
        <span v-else> Test </span>
    </span>
    <span v-else> Test </span>
</q-card-section>
---
<q-card-section>
    <span v-if="value.name === 'Name'">
        <span v-if="!member.insurances.length">Name.</span>
        <span v-else> Test </span>
    </span>
    <span v-else-if="value.name === 'Name1'" id="name1">
        <span v-if="!member.checks.length">Name1.</span>
        <span v-else> Test </span>
    </span>
    <span v-else-if="value.name === 'Name2'" id="name2">
        <span v-if="!member.rights.length">Name2.</span>
        <span v-else> Test </span>
    </span>
    <span v-else> Test </span>
</q-card-section>
