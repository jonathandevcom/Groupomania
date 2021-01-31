<template>
  <div class="footer-bottom">
    <nav>
      <ul>
        <li>
          <a href="/LegalNotice">Mentions légales</a>
        </li>
        <li>
          <a href="mailto:contact@groupomania.com">Contactez-nous</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer-bottom {
  position: fixed;
  bottom: 15px;
  height: 60px;
  width: 100%;
  display: inline-block;
}

.footer-bottom nav  {
  display:flex;
  justify-content: space-between;
}

</style>
