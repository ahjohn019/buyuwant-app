<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(DiscountSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(ItemsSeeder::class);
        $this->call(AttributeSeeder::class);
        $this->call(AttributeDetailsSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(TagsSeeder::class);
        $this->call(RoleSeeder::class);
    }
}
