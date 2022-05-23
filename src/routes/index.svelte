<script context="module" lang="ts">
import {writable} from "svelte/store";

type Inputs = "image" | "message";

let lastSelected = writable<Inputs>("image");
</script>

<script lang="ts">
    import ImageInput from "../components/ImageInput.svelte";
    import MessageInput from "../components/MessageInput.svelte";
    import { apiKey, ephemeral } from "../store/state";

    let dateRef: HTMLInputElement;

    function updateEphemeral(e: any) {
        if(dateRef.valueAsDate){
            const t = dateRef.valueAsDate;
            t.setDate(t.getDate() + 1);
            t.setHours(24, 0, 0, 0);
            $ephemeral = t.toISOString();
        }else {
            $ephemeral = "";
        }
    }

</script>

<div>
<h1>Send an image or message!</h1>

<form on:submit|preventDefault>
    <fieldset class="auth">
        <label for="apiKey">Password:</label>
        <input type="password" name="apiKey" id="apiKey" bind:value={$apiKey}><br/>
        <label for="input">I want to send </label>
        <select name="input" id="input" bind:value={$lastSelected}>
            <option value="image">an image</option>
            <option value="message">a message</option>
        </select> <br />
        <label for="ephemeral">I want to delete this {$lastSelected} after: </label>
        <input type="date" name="ephemeral" id="ephemeral" on:change={updateEphemeral} bind:this={dateRef}><br />
    </fieldset>
    {#if $lastSelected == "image"}
        <ImageInput />
    {:else}
        <MessageInput />
    {/if}
</form>
</div>

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

            #ephemeral {
                margin-top: 20px;
            }
        }
    }
</style>