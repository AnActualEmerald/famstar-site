<script lang="ts">
	import { apiKey, ephemeral } from '../store/state';
	import { fade, slide } from 'svelte/transition';
	let msg = '';
	let status = '';
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
				status = '';
			} else {
				status = e.statusText;
			}
		});
	}
</script>

<fieldset out:slide|local>
	<label for="message">Enter a message to send: </label>
	<textarea name="message" id="message" cols="30" rows="10" bind:value={msg} />
	{#if msg !== ''}
		<div transition:fade|local>
			<input class="submit" type="button" value="Submit" on:click={sendMessage} />
			{#if status !== ''}
				<p transition:fade|local class="status">{status}</p>
			{/if}
		</div>
	{/if}
</fieldset>

<style lang="scss">
	@import '../assets/colors.scss';
	fieldset {
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
		background-color: lighten($bg-primary, 5%);
		margin: 10px;
		min-width: 300px;
		max-width: 50%;
	}
</style>
