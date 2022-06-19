<script lang="ts">
	import DocCard from '../components/DocCard.svelte';
	let key: string = '';

	let docs: any[] = [];
	$: {
		fetch(`/api/docs`, { headers: { key: key } })
			.then((v) => {
				if (v.ok) {
					v.json().then((j) => {
						docs = Object.values(j);
					});
				} else {
					console.log(v);
				}
			})
			.catch((e) => {
				console.log(e);
			});
	}

	function login(_: any) {
		//TODO: handle loging in across the entire site, perhaps with individual users
		console.log('This will do something cool some day');
	}

	function removeCard(e: any) {
		docs = docs.filter((d) => d.path !== e.detail.path);
	}
</script>

<form on:submit|preventDefault={login}>
	<label for="password">Password: </label>
	<input id="password" type="password" bind:value={key} />
</form>

<div class="docs">
	{#key docs}
		{#each docs as d}
			{#if d.path.startsWith('/image')}
				<DocCard kind="image" doc={d} {key} on:delete={removeCard} />
			{:else}
				<DocCard kind="message" doc={d} {key} on:delete={removeCard} />
			{/if}
		{/each}
	{/key}
</div>

<style lang="scss">
	.docs {
		display: grid;
		width: 75%;
		margin: 10px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		grid-template-columns: 20% 20% 20% 20%;
		gap: 3em;
		padding-left: 1.5em;
		padding-right: 1.5em;
		margin-top: 3em;
	}
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
</style>
