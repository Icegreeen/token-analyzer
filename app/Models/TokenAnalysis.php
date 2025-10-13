<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TokenAnalysis extends Model
{
    protected $fillable = [
        'user_id',
        'token_address',
        'network',
        'name',
        'symbol',
        'risk_level',
        'risk_score',
        'summary',
        'verified',
        'liquidity_status',
        'top_holder_percentage',
        'is_audited',
        'audit_provider',
        'ai_verdict',
        'holders_data',
        'liquidity_data',
        'contract_data',
        'evidence_links',
        'flags',
        'detailed_analysis',
    ];

    protected $casts = [
        'verified' => 'boolean',
        'is_audited' => 'boolean',
        'top_holder_percentage' => 'float',
        'risk_score' => 'integer',
        'holders_data' => 'array',
        'liquidity_data' => 'array',
        'contract_data' => 'array',
        'evidence_links' => 'array',
        'flags' => 'array',
        'detailed_analysis' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getRiskColorAttribute(): string
    {
        return match($this->risk_level) {
            'low' => 'green',
            'medium' => 'yellow',
            'high' => 'orange',
            'critical' => 'red',
            default => 'gray',
        };
    }
}
