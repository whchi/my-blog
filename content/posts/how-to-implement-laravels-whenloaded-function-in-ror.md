---
title: 'How to Implement Laravels Whenloaded Function in Ror'
date: 2023-05-18T10:11:52+08:00
draft: false
author: 'whchi'
tags: ['ruby', 'rails', 'laravel']
summary: ''
preview_figure: 'https://images.unsplash.com/photo-1551122089-4e3e72477432?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80'
preview_figcaption: ''
preview_image: 'https://images.unsplash.com/photo-1551122089-4e3e72477432?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80'
---

The ORM library in Laravel provides support for a conditional loading association method known as `whenLoaded`.

From the Laravel official document:
> The `whenLoaded` method may be used to conditionally load a relationship. In order to avoid unnecessarily loading relationships, this method accepts the name of the relationship instead of the relationship itself.

Here's an example from Laravel's official document, use it with "ResourceResponse" can significantly enhance productivity.
```php
use App\Http\Resources\PostResource;

/**
 * Transform the resource into an array.
 *
 * @return array<string, mixed>
 */
public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'email' => $this->email,
        'posts' => PostResource::collection($this->whenLoaded('posts')),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
    ];
}
```

## How to implement it in RoR?
To achieve what "ResourceResponse" does, we need the "grape" gem.

Given two entities, PostEntity and `CommentEntity`:

* PostEntity.rb
```rb
module Entities
  class PostEntity < Grape::Entity
    expose :id, documentation: { type: 'Integer', desc: 'id' }
    expose :title, documentation: { type: 'String', desc: 'title' }
    expose :comments,
           using: CommentEntities,
           documentation: { is_array: true, desc: 'post comments' }
  end
end
```
* CommentEntity.rb
```rb
module Entities
  class CommentEntity < Grape::Entity
    expose :id, documentation: { type: 'Integer', desc: 'id' }
    expose :title, documentation: { type: 'String', desc: 'title' }
  end
end
```
When we present PostEntity, we will receive a response with comments.
```rb
present Post.all with PostEntity # {id, title, comments: [{id, title}, {id, title}]}
```
However, if we don't want to retrieve comments with every single request, we can modify it as follows:
```rb
module Entities
# ...
    expose :comments,
           using: CommentEntities,
           documentation: { is_array: true, desc: 'post comments' },
           if: -> (instance, _options) { instance.association(:comments).loaded? }
end
```
This way, comments will only be displayed if explicitly included:
```rb
#
present Post.all with PostEntity # {id, title}
present Post.includes(:comments).all with PostEntity # {id, title, comments: [{id, title}, {id, title}]}
```
### bi-direction association
What if we want to load `PostEntity` from `CommentEntity`?

1. add an association to `CommentEntity`
```rb
module Entities
# ...
    # this will cause circular error
    expose :comments,
           using: CommentEntities,
           documentation: { is_array: true, desc: 'post comments' },
           if: -> (instance, _options) { instance.association(:post).loaded? }
end
```
2. fix circular error
```rb
module Entities
# ...
    expose :comments,
           using: CommentEntities,
           documentation: { is_array: true, desc: 'post comments' },
           if: -> (instance, options) {
             options[:parent] == instance.class.name &&
             instance.association(:post).loaded?
           }
end
```
3. present
```rb
present Comment.includes(:post).all with CommentEntity, parent: 'Comment'
# {id, title, post: {id, title}}

present Post.includes(:comments).all with PostEntity, parent: 'Post'
 # {id, title, comments: [{id, title}, {id, title}]}
```
