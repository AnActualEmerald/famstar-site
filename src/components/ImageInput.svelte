<script lang="ts">
    import Dropzone from "svelte-file-dropzone";
    import {crossfade, fade, fly, slide} from "svelte/transition";
    import {apiKey} from "../store/state";

    let files = new Array<File>();
    let status = new Array<HTMLSpanElement>();

    function handleFilesSelect(e: any) {
        const { acceptedFiles } = e.detail;
        files = [...files, ...acceptedFiles];
     }

    function removeFile(n: string) {
        files = files.filter((v) => {
            v.name === n
        })
    }

    function reset() {
        files = new Array<File>();
    }

    async function sendFiles(e: Event) {
        let headers = {
            key: $apiKey
        }
        files.forEach(async (v, i) => {
            const dat = new FormData();
            dat.append(v.name, v);

            fetch("/api/image", {
                method: "POST",
                headers,
                body: dat
            }).then(e => {
                if(e.ok){
                    removeFile(v.name);
                }else {
                    status[i].innerText = e.statusText;
                }
            });
            

        });
    }
</script>

<fieldset out:slide|local class="image">
    <Dropzone on:drop={handleFilesSelect} accept={["image/png", "image/jpg"]} container-classes="dropzone">
    </Dropzone>
    {#if files.length > 0}
    <div in:fade out:fade>
        <input class="submit" type="button" value="Submit" on:click={sendFiles} />
        <p>Going to send: </p>
        <ul>
            {#each files as f, i}
                <li out:fly="{{duration:1000, x: 1000}}"><span>{f.name}</span><span class="statusText" bind:this={status[i]}></span><span id="removeButton" on:click={(_) => files = files.filter((_, ind) => i !== ind)}>X</span></li>
            {/each}
        </ul>
    </div>
    {/if}
</fieldset>

<style lang="scss"> 
    @import "../assets/colors.scss";
    .image {
        display: flex;
        flex-direction: column;
        margin: 20px;
        font-size: larger;
        color: $text-primary;
        align-items: center;

        
        ul{
            margin: 10px;
        li {
            list-style: none;
            padding: 20px;
        }
        
        .statusText {
            color: #fc4b4b;
            text-align: center;
            margin: 3px;
            margin-left: 10px;
        }

        #removeButton {
            margin: 10px;
            padding: 15px;
            border-radius: 10px;
            background-color: $accent-primary;
            color: $text-primary;
            user-select: none;
        }
        #removeButton:hover {
            background-color: lighten($accent-primary, 5%);
        }
    }   

    :global(.dropzone) {
        background-color: lighten($bg-primary, 8%);
        color: $text-primary;
        border-radius: 5px;
        padding: 100px;
        margin: 20px;
    }
    
    }
    
</style>