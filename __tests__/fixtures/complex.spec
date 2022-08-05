<x-forms.radios value="single" name="meeting_type" legend="Meeting Schedule" v-model="form.meeting_type"
:inline=" true   " :options="[
'single'=> ['label' => 'Default'],
'series' => ['label' => 'Recurring meeting'],
'scheduler'=>[ 'label' => 'Find a meeting date']]" />
<x-h1 :variable123-with-hyphen=" ['array'=>123]"/>
<x-h1 legend="Meeting Schedule" name="meeting_type" value="single" v-model="form.meeting_type" :variable123-with-hyphen=" ['array'=>123,'series' => ['label' => 'Recurring meeting'],'series2' => ['label' => 'Recurring meeting'], 'series3' => ['label' => 'Recurring meeting']]"/>
---
<x-forms.radios :inline=" true   " :options="[
'single'=> ['label' => 'Default'],
'series' => ['label' => 'Recurring meeting'],
'scheduler'=>[ 'label' => 'Find a meeting date']]" legend="Meeting Schedule" name="meeting_type" v-model="form.meeting_type" value="single"/>
<x-h1 :variable123-with-hyphen=" ['array'=>123]"/>
<x-h1 :variable123-with-hyphen=" ['array'=>123,'series' => ['label' => 'Recurring meeting'],'series2' => ['label' => 'Recurring meeting'], 'series3' => ['label' => 'Recurring meeting']]" legend="Meeting Schedule" name="meeting_type" v-model="form.meeting_type" value="single"/>
