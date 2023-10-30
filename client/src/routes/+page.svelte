<script lang="ts">
  import { redirect } from "@sveltejs/kit";
  import { current_user } from "../stores/current_user";
  export let data;

  $: {
    const user_data = data?.authedUser;
    if (user_data) {
      current_user.set(user_data);
    }
  }

</script>

{#if data.authedUser}
  <p>Hello {$current_user.name}</p>
{:else}
  <p>curious</p>
{/if}