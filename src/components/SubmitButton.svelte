<script lang="ts">
	export let action = (e: Event) => {};
</script>

<input class="submit" type="button" value="Submit" on:click={action} />
<slot />

<style lang="scss">
	@import '../assets/colors.scss';
	.submit {
		border: none;
		border-radius: 5px;
		background-color: $accent-primary;
		color: $text-primary;
		padding: 30px;
		margin: 20px;
	}
	.submit:hover {
		background-color: lighten($accent-primary, 5%);
	}
	.submit:active {
		background-color: $accent-variant;
	}
</style>
