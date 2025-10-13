<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2)->default(0);
            $table->string('interval')->default('monthly'); // monthly, yearly
            $table->integer('analyses_per_day')->default(3);
            $table->integer('monitored_wallets')->default(1);
            $table->boolean('real_time_alerts')->default(false);
            $table->boolean('pdf_reports')->default(false);
            $table->boolean('advanced_analytics')->default(false);
            $table->boolean('api_access')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
