<script lang="ts">
	import DocCard from '../components/DocCard.svelte';
	let key: string = '';
	let page = 1;

	let docs: any[] = [];
	$: {
		fetch(`/api/docs?page=${page}`, { headers: { key: key } })
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
</script>

<h1>This bit is under construction :)</h1>
<form on:submit|preventDefault={login}>
	<label for="password">Password: </label>
	<input id="password" type="password" bind:value={key} />
</form>

<div class="docs">
	{#each docs as d}
		{#if d.path.startsWith('/image')}
			<DocCard kind="image" doc={d} {key}/>
		{:else}
			<DocCard kind="message" doc={d} {key}/>
		{/if}
	{/each}
</div>

<style lang="scss">
	.docs {
		margin: 10px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		grid-template-columns: 25% 25% 25% 25%;
		display: grid;
		gap: 10px;
	}
</style>
