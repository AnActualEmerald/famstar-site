<script lang="ts">
	import { apiKey, ephemeral } from '../store/state';
	import { fade, slide } from 'svelte/transition';
	import SubmitButton from './SubmitButton.svelte';
	let msg = '';
	let status = '';

	$: if (msg === '') {
		status = '';
	}

	function sendMessage(e: any) {
		let headers = { 'Content-Type': 'application/json', key: $apiKey };
		let body: { content: string; deleteAfter: undefined | string } = {
			content: msg,
			deleteAfter: undefined
		};
		if ($ephemeral !== '') {
			body.deleteAfter = $ephemeral;
		}
		fetch('/api/message', {
			method: 'PUT',
			headers,
			body: JSON.stringify(body)
		}).then((e) => {
			if (e.ok) {
				msg = '';
			} else {
				status = e.statusText;
			}
		});
	}
</script>

<div class="container" out:slide|local>
	<label for="message">Enter a message to send: </label>
	<textarea name="message" id="message" cols="30" rows="10" bind:value={msg} />
	{#if msg !== ''}
		<div transition:slide|local>
			<SubmitButton action={sendMessage} />
			{#if status !== ''}
				<p transition:slide|local class="status">{status}</p>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	@import '../assets/colors.scss';
	.container {
		color: $text-primary;
		display: flex;
		flex-direction: column;
		align-items: center;
		label {
			font-size: x-large;
			margin: 10px;
		}
		.status {
			color: red;
			font-size: large;
		}
	}
	textarea {
		color: $text-primary;
		border: none;
		border-radius: 5px;
		background-color: lighten($bg-primary, 8%);
		margin: 10px;
		min-width: 300px;
		max-width: 50%;
	}
	textarea {
		border: $accent-variant;
	}
</style>
