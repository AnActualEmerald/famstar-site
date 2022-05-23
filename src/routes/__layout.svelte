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
    @import "../assets/colors.scss";
    $bg-lighter: lighten($color: $accent-variant, $amount: 8%);
    nav{
        ul{
            display: flex;
            padding: 0px;
            justify-content: center;
            li {
                border: 1px solid $accent-variant;
                padding: 10px;
                text-align: center;
                display: inline;
                list-style: none;
                user-select: none;
                min-width: 100pt;
                color: $text-primary;
                width: max-content;
                font-size: larger;
                border-radius: 3px;
                margin: 5px;
            }
            li:hover {   
               background-color: $accent-primary;
            }
            li.selected {
                background-color: $accent-primary;
            }
        }
    }
    main {
        color: $text-primary;
        user-select: none;
    }
</style>