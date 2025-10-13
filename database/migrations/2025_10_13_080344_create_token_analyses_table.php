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
        Schema::create('token_analyses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('token_address')->index();
            $table->string('network')->default('ethereum'); // ethereum, bsc, polygon
            $table->string('name')->nullable();
            $table->string('symbol')->nullable();
            $table->string('risk_level')->nullable(); // low, medium, high, critical
            $table->integer('risk_score')->nullable(); // 0-100
            $table->text('summary')->nullable();
            $table->boolean('verified')->default(false);
            $table->string('liquidity_status')->nullable();
            $table->decimal('top_holder_percentage', 5, 2)->nullable();
            $table->boolean('is_audited')->default(false);
            $table->string('audit_provider')->nullable();
            $table->text('ai_verdict')->nullable();
            $table->json('holders_data')->nullable();
            $table->json('liquidity_data')->nullable();
            $table->json('contract_data')->nullable();
            $table->json('evidence_links')->nullable();
            $table->json('flags')->nullable(); // red flags encontradas
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('token_analyses');
    }
};
