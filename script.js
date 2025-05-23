// script.js
document.getElementById("calc-btn").addEventListener("click", function(event) {
    event.preventDefault();
    const funcInput = document.getElementById("func-input");
    const aInput = document.getElementById("a-input");
    const bInput = document.getElementById("b-input");
    const tolInput = document.getElementById("tol-input");
    const messageDiv = document.getElementById("message");
    const tableBody = document.getElementById("iteration-body");

    // Clear previous results and message
    messageDiv.textContent = "";
    tableBody.innerHTML = "";

    let expr = funcInput.value.trim();
    if (!expr) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Please enter a function.";
        return;
    }
    let a = parseFloat(aInput.value);
    let b = parseFloat(bInput.value);
    let tol = parseFloat(tolInput.value);

    // Input validation
    if (isNaN(a) || isNaN(b)) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Please enter valid numeric values for a and b.";
        return;
    }
    if (a >= b) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Ensure that a < b.";
        return;
    }
    if (isNaN(tol) || tol <= 0) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Please enter a positive tolerance.";
        return;
    }

    // Try to compile the function expression
    let f;
    try {
        f = math.compile(expr);
    } catch (err) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Invalid function expression.";
        return;
    }

    // Evaluate function at a and b
    let fa, fb;
    try {
        fa = f.evaluate({ x: a });
        fb = f.evaluate({ x: b });
    } catch (err) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Error evaluating function at the endpoints.";
        return;
    }
    fa = Number(fa);
    fb = Number(fb);
    if (!isFinite(fa) || !isFinite(fb)) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Function returns non-finite values at the endpoints.";
        return;
    }
    // Check if either endpoint is exactly a root
    if (fa === 0) {
        messageDiv.style.color = "green";
        messageDiv.textContent = "a is a root: x = " + a;
        return;
    }
    if (fb === 0) {
        messageDiv.style.color = "green";
        messageDiv.textContent = "b is a root: x = " + b;
        return;
    }
    // Check sign change requirement
    if (fa * fb > 0) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "f(a) and f(b) must have opposite signs.";
        return;
    }

    // Bisection iterations
    let iter = 0;
    let mid, fm;
    const maxIter = 100;
    let success = false;
    while (iter < maxIter) {
        iter++;
        mid = (a + b) / 2;
        try {
            fm = f.evaluate({ x: mid });
        } catch (err) {
            messageDiv.style.color = "red";
            messageDiv.textContent = "Error evaluating function at midpoint.";
            return;
        }
        fm = Number(fm);
        if (!isFinite(fm)) {
            messageDiv.style.color = "red";
            messageDiv.textContent = "Function returned non-finite value at midpoint.";
            return;
        }
        // Add this iteration to the table
        let row = tableBody.insertRow();
        row.insertCell().textContent = iter;
        row.insertCell().textContent = math.format(a, { precision: 6 });
        row.insertCell().textContent = math.format(b, { precision: 6 });
        row.insertCell().textContent = math.format(mid, { precision: 6 });
        row.insertCell().textContent = math.format(fm, { precision: 6 });

        // Check stopping criteria
        if (Math.abs(fm) < tol) {
            success = true;
            break;
        }
        // Update interval [a, b]
        if (fa * fm < 0) {
            b = mid;
            fb = fm;
        } else {
            a = mid;
            fa = fm;
        }
        // Check interval size
        if ((b - a) / 2 < tol) {
            success = true;
            break;
        }
    }
    // Display result message
    if (success) {
        messageDiv.style.color = "green";
        messageDiv.textContent = "Root found: x = " + math.format(mid, { precision: 6 }) +
            " with f(x) = " + math.format(fm, { precision: 6 });
    } else {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Method did not converge after " + maxIter + " iterations.";
    }
});