document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('membershipForm');
    const agreed = document.getElementById('agreedToTerms');

    if (!form || !agreed) return;

    // When user clicks the checkbox, open terms in a new tab (as requested).
    agreed.addEventListener('click', function(e){
        // Open the /terms page in a new tab without disrupting the checkbox toggle
        try { window.open('/terms', '_blank', 'noopener'); } catch (err) { /* ignore */ }
    });

    // Enforce that checkbox is checked on submit and show the requested Hindi message
    form.addEventListener('submit', function(e){
        if (!agreed.checked) {
            e.preventDefault();
            alert('कृपया नियमों का पालन करने की सहमति दें');
            return;
        }
        // allow submit to proceed; submit button disabling is handled inline in join.ejs
    });
});