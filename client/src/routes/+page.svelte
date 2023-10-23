<script lang="ts">
   import {current_user} from "../stores/current_user";
   import { goto } from '$app/navigation';
   import {onMount} from "svelte";
   let isLoggedIn: boolean
   $: {
       isLoggedIn = $current_user !== null
   }
</script>

{#if isLoggedIn}
    <p> Hello {$current_user}</p>
    {:else}
    {goto('/signup')}
{/if}