<template>
	<div class="new-ticket">
		<h1>New ticket</h1>
		<SmartForm
			title="New ticket"
			:operation="operation"
			:valid="valid">
				<FormInput
					name="title"
					v-model="title"
					placeholder="Set your problem title"
					maxlength="100"
					required
				/>
				<FormInput
					type="textarea"
					name="description"
					v-model="description"
					placeholder="Describe your problem in details"
					rows="4"
				/>
				<template slot="actions">
					<router-link
						tag="button"
						:to="{name: 'tickets'}"
						class="secondary">
						Go back
					</router-link>
					<button
						type="submit"
						:disabled="!valid">
						Send ticket
					</button>
				</template>
		</SmartForm>
	</div>
</template>

<script>

import PersistantData from '../mixins/PersistantData'

export default {
	mixins: [
		PersistantData('NewTicket', [
			'title',
			'description'
		])
	],
	data(){
		return {
			title: '',
			description: '',
		}
	},
	computed: {
		valid(){
			return !!this.title && !!this.description
		}
	},
	methods: {
		async operation(){
			const result = await this.$fetch('tickets/new', {
				method: 'POST',
				body: JSON.stringify({
					title: this.title,
					description: this.description
				}),
			})
			this.title = this.description = ''
		}
	},
}
</script>