<script lang="ts" context="module">
	export type DocKind = 'message' | 'image';

	function toUint8Array(input: string): Uint8Array {
		return new Uint8Array(
			input.split('').map(function (c) {
				return c.charCodeAt(0);
			})
		);
	}
</script>

<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	export let doc: any;
	export let kind: DocKind;
	export let key: string;

	let content: any = '';
	onMount(() => {
		if (kind === 'image') {
			const raw = toUint8Array(doc.content);
			content = URL.createObjectURL(new Blob([raw]));
		} else {
			content = doc.content;
		}
	});

	const dispatch = createEventDispatcher();

	function remove(_:any) {
		fetch(`/api/delete/${doc.path}`, {headers: {"key":key}});	
		dispatch('delete', {path: doc.path});

}

</script>

<div class="card">
	<span on:click={remove}>x</span>
	{#if kind === 'image'}
		<img src={content} alt="A document" />
	{:else}
		<p>{content}</p>
	{/if}
</div>

<style lang="scss">
	@import "../assets/colors.scss";
	img {
		max-width: 100%;
	}

	.card {
		min-width: 100%;
		padding: 5px;
		background-color: lighten($bg-primary, 5%);
		border-radius: 9px;
		position:relative;
		span {
			display:block;
			background-color: red;
			border-radius: 50%;
			position: absolute;
			width: 20px;
			height: 20px;
			line-height: 20px;
			right: 0px;
			top: 0px;
			padding: 5px;
			font-size: 20px;
			font-weight: bold;
			text-align: center;
		}
		span:hover {
			background-color: darkred;
		}
	}
</style>
