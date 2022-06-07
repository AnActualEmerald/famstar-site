<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	type Input = { name: string; el: any };
	let selected = writable<Input>({
		name: 'loading...',
		el: undefined
	});
</script>

<script lang="ts">
	import { apiKey, ephemeral } from '../store/state';
	import ImageInput from '../components/ImageInput.svelte';
	import MessageInput from '../components/MessageInput.svelte';
	import { onMount } from 'svelte';
	//import { crossfade } from 'svelte/transition';

	let dateRef: HTMLInputElement;

	function updateEphemeral(_: any) {
		if (dateRef.valueAsDate) {
			const t = dateRef.valueAsDate;
			t.setDate(t.getDate() + 1);
			t.setHours(24, 0, 0, 0);
			$ephemeral = t.toISOString();
		} else {
			$ephemeral = '';
		}
	}

	let options = [
		{ name: 'image', el: ImageInput },
		{ name: 'message', el: MessageInput }
	];

	onMount(() => {
		$selected = options[0];
	});

	//const [send, rec] = crossfade({});
</script>

<form on:submit|preventDefault>
	<h1 id="formHeader">Send an image or message!</h1>

	<span>
		<label for="apiKey">Password:</label><input
			type="password"
			name="apiKey"
			id="apiKey"
			bind:value={$apiKey}
		/>
	</span>
	<span>
		<label for="input">I want to send </label>
		<select name="input" id="input" bind:value={$selected}>
			<option value={options[0]}>an image</option>
			<option value={options[1]}>a message</option>
		</select>
	</span>
	<span>
		<label for="ephemeral">I want to delete this {$selected.name} after: </label>
		<input
			type="date"
			name="ephemeral"
			id="ephemeral"
			on:change={updateEphemeral}
			bind:this={dateRef}
		/>
	</span>

	{#if $selected.el}
		<svelte:component this={$selected.el} />
	{/if}
</form>

<style lang="scss">
	@import '../assets/colors.scss';
	form {
		text-align: center;
		color: $text-primary;
		background-color: lighten($bg-primary, 5%);
		border-radius: 5px;
		border: none;
		width: 50%;
		padding: 1em;
		padding-bottom: 5em;
		position: absolute;
		left: 50%;
		transform: translate(-50%);
		display: flex;
		flex-direction: column;
		gap: 2em;

		input {
			border: none;
			border-radius: 9px;
			padding: 9px;
		}
		label {
			font-size: x-large;
			vertical-align: middle;
			margin-right: 10px;
		}

		#input {
			border: none;
			border-radius: 5px;
			background-color: $accent-variant;
			color: $text-primary;
			padding: 15px;
		}
	}
</style>
