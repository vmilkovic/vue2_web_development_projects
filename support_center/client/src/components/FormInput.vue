<template>
	<div class="row">
		<component
			:is="element"
			@input="update"
			class="input"
			:class="inputClass"
			:name="name"
			:type="type"
			:value.prop="text"
			:placeholder="placeholder"
			v-bind="$attrs"
		/>
	</div>
</template>

<script>
export default {
	model: {
		prop: 'text',
		event: 'update',
	},
	props: {
		name: {
			type: String,
		},
		type: {
			type: String,
			default: 'text'
		},
		text: {
			required: true,
		},
		placeholder: {
			type: String
		},
		invalid: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		inputClass(){
			return {
				'invalid' : this.invalid,
			}
		},
		element(){
			return this.type === 'textarea' ? this.type : 'input'
		}
	},
	methods: {
		update(event){
			this.$emit('update', event.currentTarget.value)
		}
	}
}
</script>