<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WalletController extends Controller
{
    /**
     * Get user's wallets
     */
    public function index(Request $request)
    {
        $wallets = $request->user()->wallets()
            ->with('alerts')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $wallets,
        ]);
    }

    /**
     * Add a new wallet
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'address' => 'required|string|regex:/^0x[a-fA-F0-9]{40}$/',
            'network' => 'required|string|in:ethereum,bsc,polygon',
            'label' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid wallet data',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = $request->user();

        // Check if user can add more wallets
        if (!$user->canAddWallet()) {
            return response()->json([
                'success' => false,
                'message' => 'Wallet limit reached. Upgrade your plan to monitor more wallets.',
            ], 403);
        }

        // Check if wallet already exists for this user
        $exists = Wallet::where('user_id', $user->id)
            ->where('address', $request->input('address'))
            ->where('network', $request->input('network'))
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'This wallet is already being monitored',
            ], 409);
        }

        $wallet = Wallet::create([
            'user_id' => $user->id,
            'address' => $request->input('address'),
            'network' => $request->input('network'),
            'label' => $request->input('label'),
            'alerts_enabled' => true,
        ]);

        return response()->json([
            'success' => true,
            'data' => $wallet,
            'message' => 'Wallet added successfully',
        ], 201);
    }

    /**
     * Update wallet
     */
    public function update(Request $request, $id)
    {
        $wallet = Wallet::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $validator = Validator::make($request->all(), [
            'label' => 'nullable|string|max:255',
            'alerts_enabled' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $wallet->update($request->only(['label', 'alerts_enabled']));

        return response()->json([
            'success' => true,
            'data' => $wallet,
            'message' => 'Wallet updated successfully',
        ]);
    }

    /**
     * Delete wallet
     */
    public function destroy(Request $request, $id)
    {
        $wallet = Wallet::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $wallet->delete();

        return response()->json([
            'success' => true,
            'message' => 'Wallet removed successfully',
        ]);
    }

    /**
     * Get wallet details with tokens
     */
    public function show(Request $request, $id)
    {
        $wallet = Wallet::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->with(['alerts' => function($query) {
                $query->orderBy('created_at', 'desc')->limit(10);
            }])
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $wallet,
        ]);
    }
}
