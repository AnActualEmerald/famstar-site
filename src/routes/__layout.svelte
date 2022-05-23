<script lang="ts">
    import "../assets/app.scss";

    let selected = [true, false];

</script>


<div class="content">
    <nav>
        <ul>
            <li class="{selected[0] ? "selected" : ""}" on:click= {(_) => {selected[0] = true; selected[1] = false}}>Send</li>
            <li class="{selected[1] ? "selected" : ""}" on:click= {(_) => {selected[1] = true; selected[0] = false}}>Manage</li>
        </ul>
    </nav>
    <main>
        <slot></slot>
    </main>
</div>



<style lang="scss">
    nav{
        ul{
            display: flex;
            padding: 0px;
            justify-content: center;
            li {
                border: 1px solid lighten($color: #202020, $amount: 5%);
                padding: 10px;
                text-align: center;
                display: inline;
                list-style: none;
                user-select: none;
                min-width: 100pt;
                color: #017ec6;
                width: max-content;
            }
            li:hover {   
               background-color: lighten($color: #202020, $amount: 5%);
            }
            li.selected {
                background-color: lighten($color: #202020, $amount: 5%);
            }
        }
    }
    main {
        color: #017ec6;
    }
</style>