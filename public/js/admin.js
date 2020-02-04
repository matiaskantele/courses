// eslint-disable-next-line no-unused-vars
const deleteProduct = btn => {
  const prodId = btn.parentNode.querySelector('[name=productId]').value;
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

  const containingElement = btn.closest('article');

  fetch(`/admin/product/${prodId}`, {
    method: 'DELETE',
    headers: {
      'csrf-token': csrf,
    },
  })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(() => {
      containingElement.remove();
    })
    .catch(err => console.log(err));
};
