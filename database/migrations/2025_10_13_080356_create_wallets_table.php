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
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('address')->index();
            $table->string('network')->default('ethereum');
            $table->string('label')->nullable();
            $table->boolean('alerts_enabled')->default(true);
            $table->timestamp('last_checked_at')->nullable();
            $table->json('tokens')->nullable(); // lista de tokens da carteira
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallets');
    }
};
