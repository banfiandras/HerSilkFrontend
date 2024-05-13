<template>

    <form class="row g-3">
        <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Username</label>
            <input required type="username" class="form-control" id="inputEmail4">
        </div>
        <div class="col-md-6">
            <label for="inputPassword4" class="form-label">Password</label>
            <input required type="password" class="form-control" id="inputPassword4">
        </div>
        <div class="col-12">
            <label for="inputAddress" class="form-label">email:</label>
            <input required type="text" class="form-control" id="inputAddress" placeholder="example@gmail.com">
        </div>
        
        <div class="col-12">
            <button type="submit" class="btn btn-primary">Sign in</button>
        </div>
    </form>

</template>