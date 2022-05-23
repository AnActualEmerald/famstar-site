<script lang="ts">
import { onMount } from "svelte";
import { page } from "$app/stores";
    import "../assets/app.scss";
    
    let selected = [true, false];

    $: {
        const p = $page;
        if(p.url.pathname === "/") {
            selected = [true, false];
        }else if(p.url.pathname === "/manage") {
            selected = [false, true];
        }
    }

</script>


<div class="content">
    <nav>
        <ul>
            <li><a class="{selected[0] ? "selected" : ""}" href="/">Send</a></li>
            <li><a class="{selected[1] ? "selected" : ""}" href="/manage">Manage</a></li>
        </ul>
    </nav>
    <main>
        <slot></slot>
    </main>
</div>



<style lang="scss">
    @import "../assets/colors.scss";
    $bg-lighter: lighten($color: $accent-variant, $amount: 8%);
    nav{
        ul{
            display: flex;
            padding: 0px;
            justify-content: center;
             li {
                list-style: none;
                display: flex;

             }

            a:hover {   
               background-color: $accent-primary;
            }
            a.selected {
                background-color: $accent-primary;
            }
            a {
                text-decoration: none;
                border: 1px solid $accent-variant;
                padding: 10px;
                text-align: center;
                display: inline;
                user-select: none;
                color: $text-primary;
                font-size: larger;
                border-radius: 3px;
                margin: 5px;
                min-width: 100pt;

            }
            
        }
    }
    main {
        color: $text-primary;
        user-select: none;
    }
</style>