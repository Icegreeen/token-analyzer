<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class BlogController extends Controller
{
    public function index()
    {
        $posts = $this->getAllPosts();
        
        \Log::info('Blog posts:', ['count' => count($posts), 'posts' => $posts]);

        return Inertia::render('blog', [
            'posts' => $posts,
        ]);
    }

    public function show($slug)
    {
        $post = $this->getPostBySlug($slug);

        if (!$post) {
            abort(404);
        }

        return Inertia::render('blog-post', [
            'post' => $post,
        ]);
    }

    private function getAllPosts()
    {
        $blogPath = storage_path('blog');
        
        \Log::info('Blog path:', ['path' => $blogPath, 'exists' => File::exists($blogPath)]);
        
        if (!File::exists($blogPath)) {
            \Log::warning('Blog directory does not exist');
            return [];
        }

        $files = File::files($blogPath);
        \Log::info('Files found:', ['count' => count($files)]);
        $posts = [];

        foreach ($files as $file) {
            \Log::info('Processing file:', ['name' => $file->getFilename(), 'ext' => $file->getExtension()]);
            
            if ($file->getExtension() === 'md') {
                $content = File::get($file->getPathname());
                \Log::info('File content length:', ['length' => strlen($content)]);
                
                $metadata = $this->parseMetadata($content);
                
                if ($metadata) {
                    $posts[] = $metadata;
                    \Log::info('Post added:', ['metadata' => $metadata]);
                } else {
                    \Log::warning('No metadata parsed for file:', ['file' => $file->getFilename()]);
                }
            }
        }

        // Sort by date (newest first)
        usort($posts, function($a, $b) {
            return strtotime($b['date']) - strtotime($a['date']);
        });

        return $posts;
    }

    private function getPostBySlug($slug)
    {
        $blogPath = storage_path('blog');
        $files = File::files($blogPath);

        foreach ($files as $file) {
            if ($file->getExtension() === 'md') {
                $content = File::get($file->getPathname());
                $metadata = $this->parseMetadata($content);
                
                if ($metadata && $metadata['slug'] === $slug) {
                    // Remove metadata from content
                    $lines = explode("\n", $content);
                    $inMetadata = false;
                    $contentLines = [];
                    
                    foreach ($lines as $line) {
                        if ($line === '---') {
                            if (!$inMetadata) {
                                $inMetadata = true;
                                continue;
                            } else {
                                $inMetadata = false;
                                continue;
                            }
                        }
                        
                        if (!$inMetadata) {
                            $contentLines[] = $line;
                        }
                    }
                    
                    $metadata['content'] = implode("\n", $contentLines);
                    return $metadata;
                }
            }
        }

        return null;
    }

    private function parseMetadata($content)
    {
        $lines = explode("\n", $content);
        
        if (!isset($lines[0]) || trim($lines[0]) !== '---') {
            \Log::warning('No metadata found, first line:', ['line' => $lines[0] ?? 'empty']);
            return null;
        }

        $metadata = [];
        
        for ($i = 1; $i < count($lines); $i++) {
            $line = trim($lines[$i]);
            
            if ($line === '---') {
                break;
            }
            
            if (preg_match('/^(\w+):\s*(.+)$/', $line, $matches)) {
                $key = $matches[1];
                $value = trim($matches[2], ' "');
                $metadata[$key] = $value;
                \Log::info('Parsed metadata:', ['key' => $key, 'value' => $value]);
            }
        }

        if (empty($metadata)) {
            \Log::warning('Metadata is empty');
            return null;
        }

        return $metadata;
    }
}

