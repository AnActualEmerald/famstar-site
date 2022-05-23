<script lang="ts">
    import ImageInput from "../components/ImageInput.svelte";
    import { apiKey } from "../store/state";

    type Inputs = "image" | "message";
    let input: Inputs = "image";


</script>

<h1>Send a message or an image!</h1>

<form>
    <fieldset class="auth">
        <label for="apiKey">Password:</label>
        <input type="password" name="apiKey" id="apiKey" bind:value={$apiKey}><br/>
        <label for="input">I want to send </label>
        <select name="input" id="input" bind:value={input}>
            <option value="image">an image</option>
            <option value="message">a message</option>
        </select>
        {#if input == "image"}
            <ImageInput></ImageInput>
        {:else}
            <p>TODO</p>
        {/if}
    </fieldset>

    
</form>

<style lang="scss">
    @import "../assets/colors.scss";
    form{
        text-align: center;
       
        .auth{
            input {
                border: none;
                border-radius: 9px;
                padding: 9px;
                color: $text-primary;
                background-color: lighten($bg-primary, 8%);
            }
            label {
                font-size: x-large;
                vertical-align: middle;
                margin-right: 10px;
            }

            #input {
                margin-top: 20px;
                border: none;
                border-radius: 5px;
                background-color: $accent-variant;
                color: $text-primary;
                padding: 15px;
            }
        }
    }
</style>