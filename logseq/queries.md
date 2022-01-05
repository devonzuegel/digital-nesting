# Home page queries 🪴

These are the queries I have on my home page at all times. 

I figured others might find it useful too, so I copied them here for your use. Enjoy!

<center>~</center>

#### currently DOING
```
- #+BEGIN_QUERY
  {:title "currently DOING"
  :collapsed? false
  :breadcrumb-show? false
  :result-transform (fn [result]
                          (sort-by (fn [h]
                                       (if true
                                           (count (get h :block/count))
                                           (* 1 (get h :block/created-at)) result))))
  :query [:find (pull ?b [*])
  				:where
  					[?b :block/marker ?marker]
  					[(contains? #{"NOW" "DOING"} ?marker)]
  				]
  	 }
```

#### deadlines (short-term: overdue + within 7 days)
```
- #+BEGIN_QUERY
  {:title "deadlines (short-term: overdue + within 7 days)"
    :query [:find (pull ?block [*])
            :in $ ?start ?next
            :where
           [?block :block/marker ?marker]
            [(contains? #{"NOW" "LATER" "TODO" "WAITING"} ?marker)]
            (or
              [?block :block/scheduled ?d]
              [?block :block/deadline ?d])
            [(> ?d ?start)]
            [(< ?d ?next)]]
    :inputs [:365d-before :7d-after]
    :breadcrumb-show? false
    :result-transform (fn [result]
                          (sort-by (fn [h]
                                     (get h :block/created-at)) result))
    :collapsed? false
  }
  #+END_QUERY
```

#### deadlines (medium-term: within 60 days)
```
- #+BEGIN_QUERY
  {:title "deadlines (medium-term: within 60 days)"
    :query [:find (pull ?block [*])
            :in $ ?start ?next
            :where
           [?block :block/marker ?marker]
            [(contains? #{"NOW" "LATER" "TODO" "DOING" "WAITING"} ?marker)]
            (or
              [?block :block/scheduled ?d]
              [?block :block/deadline ?d])
            [(< ?d ?start)]
            [(> ?d ?next)]]
    :inputs [:60d-after :7d-after]
    :breadcrumb-show? false
    :result-transform (fn [result]
                          (sort-by (fn [h]
                                     (get h :block/created-at)) result))
    :collapsed? false
  }
  #+END_QUERY
```

#### all other outstanding TODOs
```
- #+BEGIN_QUERY
  {:title "outstanding TODOs"
  :collapsed? true
	:breadcrumb-show? false
  :query [:find (pull ?b [*])
  				:where
  					[?b :block/marker ?marker]
  					[(contains? #{"TODO"} ?marker)]
                      (not [?b :block/path-refs [:block/name "skipped"]])
  				]
  }
  #+END_QUERY
```